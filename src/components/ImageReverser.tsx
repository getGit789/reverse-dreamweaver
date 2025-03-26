import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Upload, RotateCcw, Download, Trash2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ImageReverser = () => {
  const [image, setImage] = useState<string | null>(null);
  const [transformType, setTransformType] = useState('flipHorizontal');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error('Image size should be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const transformImage = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (transformType === 'flipHorizontal') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      } else if (transformType === 'flipVertical') {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      } else if (transformType === 'rotate180') {
        ctx.translate(canvas.width, canvas.height);
        ctx.scale(-1, -1);
      }

      ctx.drawImage(img, 0, 0);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'reversed-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const resetCanvas = () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gradient">Image Reverser</h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[200px] text-sm">
            Upload an image and choose how to transform it: flip horizontally, vertically, or rotate 180°.
          </TooltipContent>
        </Tooltip>
      </div>
      
      {!image ? (
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 text-center hover:border-nuno-purple transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-base sm:text-lg font-medium mb-2">Upload an image</h3>
          <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            PNG, JPG or GIF (max. 10MB)
          </p>
          <Button className="gradient-bg text-white hover:opacity-90 text-sm sm:text-base py-2 sm:py-3">
            <Upload className="h-4 w-4 mr-2" /> Choose image
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div className="mb-4 sm:mb-6">
            <Label className="text-sm sm:text-base mb-2 block">Transform type:</Label>
            <Tabs value={transformType} onValueChange={setTransformType} className="w-full">
              <TabsList className="w-full grid grid-cols-3 gap-1 sm:gap-2">
                <TabsTrigger value="flipHorizontal" className="text-sm sm:text-base py-2">
                  Horizontal
                </TabsTrigger>
                <TabsTrigger value="flipVertical" className="text-sm sm:text-base py-2">
                  Vertical
                </TabsTrigger>
                <TabsTrigger value="rotate180" className="text-sm sm:text-base py-2">
                  180°
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
            <div className="flex-1">
              <Label className="text-sm sm:text-base mb-2 block">Original Image:</Label>
              <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                <img 
                  src={image} 
                  alt="Original" 
                  className="w-full h-auto object-contain max-h-[200px] sm:max-h-[300px]" 
                />
              </div>
            </div>
            
            <div className="flex-1">
              <Label className="text-sm sm:text-base mb-2 block">Transformed Image:</Label>
              <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full max-h-[200px] sm:max-h-[300px] object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <Button
              className="gradient-bg text-white hover:opacity-90 text-sm sm:text-base py-3"
              onClick={transformImage}
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Transform
            </Button>
            <Button
              variant="outline"
              className="text-sm sm:text-base py-3"
              onClick={downloadImage}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button
              variant="destructive"
              className="text-sm sm:text-base py-3"
              onClick={resetCanvas}
            >
              <Trash2 className="h-4 w-4 mr-2" /> Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageReverser;
