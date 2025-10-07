import { useState } from "react";
import { Upload, Image } from "antd";
import ImgCrop from "antd-img-crop";
import type { UploadFile, UploadProps, GetProp } from "antd";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface Props {
    fileList: UploadFile[];
    setFileList: (files: UploadFile[]) => void;
    imageError?: boolean;
    setImageError?: (value: boolean) => void;
}

const ImageUploader: React.FC<Props> = ({
                                                         fileList,
                                                         setFileList,
                                                         imageError,
                                                         setImageError
                                                     }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    return (
        <div>
            <ImgCrop rotationSlider>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={({ fileList }) => {
                        setFileList(fileList);
                        setImageError && setImageError(false);
                    }}
                    onPreview={handlePreview}
                    customRequest={({ onSuccess }) => {
                        setTimeout(() => onSuccess?.("ok"), 0);
                    }}
                >
                    {fileList.length < 1 && "+ Upload"}
                </Upload>
            </ImgCrop>

            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}

            {imageError && (
                <div className="text-red-500 text-sm mt-1">
                    Оберіть зображення категорії
                </div>
            )}
        </div>
    );
};

export default ImageUploader;