import type { CheckboxProps } from 'element-plus';

export type RCheckboxProps = {
  options: (CheckboxProps & { value: ModelValue })[];
  type?: 'button' | 'group';
  border?: boolean;
};
