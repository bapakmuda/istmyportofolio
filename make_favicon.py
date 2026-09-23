from PIL import Image

def make_transparent_and_save_ico(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Make white (or near-white) transparent
    for item in datas:
        # Check if the pixel is near white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    
    # Resize to a standard favicon size to be safe
    img = img.resize((256, 256), Image.Resampling.LANCZOS)
    
    # Save as ICO
    img.save(output_path, format="ICO", sizes=[(256, 256)])

if __name__ == "__main__":
    make_transparent_and_save_ico("/Users/fird/.gemini/antigravity-ide/brain/0b49a6a4-f45d-4aa2-89a8-3aa988f4bdfb/.user_uploaded/media_1790194898158.png", "/Users/fird/Documents/PORT-FIRD/src/app/favicon.ico")
