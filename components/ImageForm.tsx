import React from "react";
import { Button } from "./ui/button";

interface Props {
  preview: string | null;
  setPreview: (preview: string | null) => void;
}

const ImageForm = ({ preview, setPreview }: Props) => {
  return (
    <>
      <label htmlFor={`${preview === null ? "image" : ""}`}>
        <div className="cursor-pointer flex flex-col w-lg mx-auto  items-center justify-center border-2 border-dashed border-gray-300 rounded-lg py-20 ">
          {preview ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={preview}
                alt="preview"
                className=" w-full h-auto rounded-md object-cover"
              />
            </div>
          ) : (
            <>
              <span className="text-4xl text-gray-400">+</span>

              <span className="text-sm font-medium text-gray-700 mt-5">
                Add an image
              </span>
              <span className="text-xs text-gray-500">
                Upload an image to make your story stand out
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
            id="image"
          />
        </div>
      </label>

      {preview && (
        <div className="items-center flex justify-center">
          <Button
            onClick={() => setPreview(null)}
            className="w-fit items-center"
          >
            Remove
          </Button>
        </div>
      )}
    </>
  );
};

export default ImageForm;
