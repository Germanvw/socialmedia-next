import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { Field, useField } from 'formik';

interface Props {
  label: string;
  list: any[];
  onChange: any;
  [x: string]: any;
}

export const DropdownInput = ({ list, label, onChange }: Props) => {
  const lowerCaseLabel = label.toLocaleLowerCase();

  const [field, meta] = useField(lowerCaseLabel);
  return (
    <FormControl id={lowerCaseLabel} isRequired>
      <FormLabel>{label}</FormLabel>
      <Select variant='outline' onChange={onChange}>
        {list?.map((item: any) => (
          <option value={parseInt(item.id)} key={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
