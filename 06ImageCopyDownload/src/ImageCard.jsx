import React from 'react';
import { useRef ,useState, useEffect} from 'react';


const ImageCard = ({ imageUrl, sourceTag }) => {
    // Function to download the image
    const imageRef = useRef(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        const img = imageRef.current;

        const handleImageLoad = () => {
            setIsImageLoaded(true);
        };

        if (img) {
            img.addEventListener('load', handleImageLoad);

            // Cleanup event listener on unmount or when image changes
            return () => {
                img.removeEventListener('load', handleImageLoad);
            };
        }
    }, [imageUrl]);

    // const downloadImage = async (withTag = false) => {
    //     if (withTag && isImageLoaded) {
    //         const image = imageRef.current;

    //         // Create a canvas element to overlay the source tag
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');

    //         // Set canvas dimensions to match the image
    //         canvas.width = image.naturalWidth;
    //         canvas.height = image.naturalHeight;

    //         // Draw the original image onto the canvas
    //         ctx.drawImage(image, 0, 0);

    //         // Set the style for the source tag (watermark)
    //         ctx.font = '24px Arial';
    //         ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';  // White color with slight transparency
    //         ctx.textAlign = 'left';
    //         ctx.textBaseline = 'bottom';

    //         // Position the source tag at the bottom left corner of the image
    //         const padding = 10;
    //         ctx.fillText(sourceTag, padding, canvas.height - padding);

    //         // Convert the canvas to a blob and download it
    //         canvas.toBlob((blob) => {
    //             const link = document.createElement('a');
    //             link.href = URL.createObjectURL(blob);
    //             link.download = `image_with_tag.png`;
    //             link.click();
    //         }, 'image/png');
    //         } else {
    //         // Download image with source tag by adding a watermark effect (CSS-only for display)
    //         const response = await fetch(imageUrl);
    //         const blob = await response.blob();
    //         const url = URL.createObjectURL(blob);
    //         const img = new Image();
    //         img.src = url;

    //         img.onload = () => {
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.download = `image_with_tag_${sourceTag}.png`;
    //             link.click();
    //             URL.revokeObjectURL(url);
    //         };
    //     }
    // };

    const downloadImage = async (withTag = false) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            if (withTag) {
                // Load the image from the blob
                const img = new Image();
                img.src = URL.createObjectURL(blob);

                img.onload = () => {
                    // Create a canvas to draw the image and the tag
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Set the canvas size to match the image
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;

                    // Draw the image onto the canvas
                    ctx.drawImage(img, 0, 0);

                    // Set the style for the source tag (watermark)
                    ctx.font = '24px Arial';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';  // White color with slight transparency
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'bottom';

                    // Position the source tag at the bottom left corner of the image
                    const padding = 10;
                    ctx.fillText(sourceTag, padding, canvas.height - padding);

                    // Convert the canvas to a blob and trigger download
                    canvas.toBlob((taggedBlob) => {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(taggedBlob);
                        link.download = `image_with_tag.png`;
                        link.click();
                        URL.revokeObjectURL(link.href);
                    }, 'image/png');
                };
            } else {
                // Directly download the original image
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `image.png`;
                link.click();
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };
    
    const copyImageToClipboard = async (withTag = false) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
    
            if (withTag) {
                // Load the image from the blob
                const img = document.createElement('img');
                img.src = URL.createObjectURL(blob);
    
                img.onload = async () => {
                    // Create a canvas to draw the image and the tag
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
    
                    // Set the canvas size to match the image
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
    
                    // Draw the image onto the canvas
                    ctx.drawImage(img, 0, 0);
    
                    // Set the style for the source tag (watermark)
                    ctx.font = '50px Arial';
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';  // White color with slight transparency
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'bottom';
    
                    // Position the source tag at the bottom left corner of the image
                    const padding = 10;
                    ctx.fillText(sourceTag, padding, canvas.height - padding);
    
                    // Convert the canvas to a blob and copy it to clipboard
                    canvas.toBlob(async (taggedBlob) => {
                        await navigator.clipboard.write([
                            new ClipboardItem({
                                [taggedBlob.type]: taggedBlob,
                            }),
                        ]);
                        alert('Image with source tag copied to clipboard!');
                    }, 'image/png');
                };
            } else {
                // Directly copy the original image to clipboard
                await navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob,
                    }),
                ]);
                alert('Original image copied to clipboard!');
            }
        } catch (error) {
            console.error('Failed to copy image:', error);
            alert('Failed to copy image to clipboard.');
        }
    };
    

    return (
        <div className="image-card" style={{ position: 'relative', display: 'inline-block' }}>
            <img
                src={imageUrl}
                alt="Image"
                style={{ maxWidth: '100%', display: 'block' }}
            />
            {/* {sourceTag && (
                <div
                    className="source-tag"
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '5px',
                        borderRadius: '5px',
                        fontSize: '14px',
                    }}
                >
                    {sourceTag}
                </div>
            )} */}
            <div className="buttons" style={{ marginTop: '10px' }}>
                <button onClick={() => downloadImage(false)}>Download Original</button>
                <button onClick={() => downloadImage(true)}>Download with Source Tag</button>
                <button onClick={() => copyImageToClipboard(false)}>Copy Original Image</button>
                <button onClick={() => copyImageToClipboard(true)}>Copy Image with Source Tag</button>
            </div>
        </div>
    );
};

export default ImageCard;
