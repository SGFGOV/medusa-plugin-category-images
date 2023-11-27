import { Product, ProductCategory } from '@medusajs/medusa';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAdminUpdateProduct,
  useAdminUpdateProductCategory,
  useMedusa,
} from 'medusa-react';
import { Button, FocusModal } from '@medusajs/ui';
import { nestedForm } from './utils/nested-form';
import { prepareImages } from './utils/images';
import CategoriesImagesMediaForm, {
  MediaFormType,
} from './category-images-media-form';

type Notify = {
  success: (title: string, message: string) => void;
  error: (title: string, message: string) => void;
  warn: (title: string, message: string) => void;
  info: (title: string, message: string) => void;
};

export type FormImage = {
  url: string;
  name?: string;
  size?: number;
  nativeFile?: File;
};

type Props = {
  product: Product;
  category: ProductCategory;
  open: boolean;
  onClose: () => void;
  notify: Notify;
  type: 'thumbnail' | 'media';
};

type MediaFormWrapper = {
  media: MediaFormType;
};

const CategoriesImagesModal = ({
  category,
  open,
  onClose,
  product,
  notify,
  type,
}: Props) => {
  const { client } = useMedusa();
  const [isUpdating, setIsUpdating] = useState(false);
  const adminUpdateCategory = useAdminUpdateProductCategory(category?.id);
  const adminUpdateProduct = useAdminUpdateProduct(product?.id);
  const form = useForm<MediaFormWrapper>({
    defaultValues: getDefaultValues(product, category, type),
  });

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form;

  useEffect(() => {
    reset(getDefaultValues(product, category, type));
  }, [reset, product, category, type]);

  const onReset = () => {
    reset(getDefaultValues(product, category, type));
    onClose();
  };

  const onSubmit = handleSubmit(async (data: any) => {
    setIsUpdating(true);
    let preppedImages: FormImage[] = [];

    try {
      preppedImages = await prepareImages(
        data.media.images,
        client.admin.uploads
      );
    } catch (error) {
      let errorMessage = 'Something went wrong while trying to upload images.';
      const response = (error as any).response as Response;

      if (response.status === 500) {
        errorMessage = `${errorMessage} You might not have a file service configured. Please contact your administrator.`;
      }

      notify.error('Error', errorMessage);
      return;
    }
    const urls = preppedImages.map((image) => image.url);
    await adminUpdateProduct.mutateAsync({ images: urls });

    if (type === 'thumbnail') {
      const thumbnail =
        data.media.images.find((image) => image.selected)?.url || null;

      await adminUpdateCategory.mutateAsync({
      
        // @ts-ignore
        thumbnail,
      });
    } else {
      const images = data.media.images
        .map(({ selected }, i: number) => selected && urls[i])
        .filter(Boolean);

      await adminUpdateCategory.mutateAsync({
        
        // @ts-ignore
        images,
      });
    }

    onClose();
    setIsUpdating(false);
  });

  return (
    <FocusModal open={open} onOpenChange={onReset} modal>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button
            variant="primary"
            type="submit"
            disabled={!isDirty}
            isLoading={isUpdating}
            form="category-images-form"
          >
            Save and close
          </Button>
        </FocusModal.Header>
        <FocusModal.Body className=" p-4">
          <form onSubmit={onSubmit} id="category-images-form">
            <div>
              <h2 className="inter-large-semibold mb-2xsmall">Media</h2>
              <p className="inter-base-regular text-grey-50 mb-large">
                Add images to your product media.
              </p>
              <div>
                <CategoriesImagesMediaForm
                  form={nestedForm(form, 'media')}
                  type={type}
                />
              </div>
            </div>
          </form>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
};

const getDefaultValues = (
  product: Product,
  category: ProductCategory,
  type: 'thumbnail' | 'media'
): MediaFormWrapper => {
  return {
    media: {
      images:
        product?.images?.map((image) => ({
          url: image.url,
          selected:
            type === 'thumbnail'
              ? category.thumbnail === image.url
              : category?.images?.some((vImage) => vImage.url === image.url) ??
                false,
        })) || [],
    },
  };
};

export default CategoriesImagesModal;
