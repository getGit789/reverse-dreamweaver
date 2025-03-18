
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Upload, RotateCcw, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

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
    toast.success('Image downloaded successfully!');
  };

  const resetCanvas = () => {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gradient">Image Reverser</h2>
      
      {!image ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-nuno-purple transition-colors">
          <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Upload an image</h3>
          <p className="text-sm text-gray-500 mb-6">
            PNG, JPG or GIF (max. 10MB)
          </p>
          <Button className="gradient-bg text-white hover:opacity-90" onClick={() => inputRef.current?.click()}>
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
        <div className="space-y-6">
          <div className="mb-6">
            <Label>Transform type:</Label>
            <Tabs value={transformType} onValueChange={setTransformType} className="mt-2">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="flipHorizontal">Flip Horizontal</TabsTrigger>
                <TabsTrigger value="flipVertical">Flip Vertical</TabsTrigger>
                <TabsTrigger value="rotate180">Rotate 180°</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 mb-4 md:mb-0">
              <Label className="mb-2 block">Original Image:</Label>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <img 
                  src={image} 
                  alt="Original" 
                  className="w-full h-auto object-contain max-h-[300px]" 
                />
              </div>
            </div>
            
            <div className="flex-1">
              <Label className="mb-2 block">Transformed Image:</Label>
              <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center min-h-[200px]">
                <canvas 
                  ref={canvasRef} 
                  className="max-w-full max-h-[300px] object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button
              className="gradient-bg text-white hover:opacity-90 flex-1"
              onClick={transformImage}
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Transform
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={downloadImage}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
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
