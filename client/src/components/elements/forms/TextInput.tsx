import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useField } from 'formik';

interface Props {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  [x: string]: any;
  showError?: boolean;
  icon?: React.ReactElement;
}

export const TextInput = ({
  label,
  showError,
  icon,
  required,
  ...props
}: Props) => {
  const [field, meta] = useField(props);
  return (
    <FormControl
      id={props?.name}
      isRequired
      isInvalid={meta?.error ? true : false}
    >
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement>{icon}</InputLeftElement>
        <Input {...props} {...field} errorBorderColor='red.400' />
      </InputGroup>
      {required && meta?.error ? (
        <FormErrorMessage mb={2}>{meta?.error}</FormErrorMessage>
      ) : (
        <Box height='32px'></Box>
      )}
    </FormControl>
  );
};
