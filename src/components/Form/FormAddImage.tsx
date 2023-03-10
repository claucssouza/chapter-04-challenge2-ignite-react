import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from "yup";
import { useAddImages } from '../../hooks/useAddImages';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();
  const FILE_SIZE = "1000000";
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif"];
  const { addImages, isError: isErrorAddImages, isSuccess: isSuccessAddImages } = useAddImages();
  const formValidations = yup.object({
    title: yup.string().required('Digite o titulo da imagem').min(2, 'Mínimo de caracter permitido 2').max(20, 'Máximo de caracter permitido 20'),
    description: yup.string().required('Digite a descrição da imagem').max(65, 'Máximo de caracter permitido 65'),
    imageUrl: yup
      .mixed()
      .nullable()
      .notRequired()
      .test("FILE_SIZE", "A imagem é obrigat´roai", (value) => {
        return !value || value.length > 0;
      })
      .test("FILE_SIZE", "O arquivo deve ser menor que 10MB.", (value) => {
        return (
          !value || (value && value.length > 0 && value[0].size <= FILE_SIZE)
        );
      })
      .test(
        "FILE_FORMAT",
        "Somente são aceitos arquivos PNG, JPEG e GIF.",
        (value) =>
          !value ||
          (value &&
            value.length > 0 &&
            SUPPORTED_FORMATS.includes(value[0].type))
      ),
  });

  const methods = useForm({
    resolver: yupResolver(formValidations),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });


const {
  register,
  handleSubmit,
  reset,
  formState,
  setError,
  trigger,
  formState: { errors }
} =  methods;

  const onSubmit = async (data: Record<string, FileList>): Promise<void> => {
    try {
        addImages(data);
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao realizar o cadastro sua imagem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <FormProvider {...methods}>
      <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FileInput
            setImageUrl={setImageUrl}
            localImageUrl={localImageUrl}
            setLocalImageUrl={setLocalImageUrl}
            setError={setError}
            trigger={trigger}
            {...register('imageUrl')}
            aria-invalid={errors?.image?.message}
          />

          <TextInput
            placeholder="Título da imagem..."
            {...register('title')}
            error={errors?.title?.message.toString()}
          />

          <TextInput
            placeholder="Descrição da imagem..."
            {...register('description')}
            error={errors?.description?.message.toString()}
          />
        </Stack>

        <Button
          my={6}
          isLoading={formState.isSubmitting}
          isDisabled={formState.isSubmitting}
          type="submit"
          w="100%"
          py={6}
        >
          Enviar
        </Button>
      </Box>
    </FormProvider>
  );
}
