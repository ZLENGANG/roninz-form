import type { RadioProps, RadioButtonProps } from 'element-plus';

export type RRadioProps = {
  options: (RadioProps & RadioButtonProps & { value: ModelValue })[];
  type?: 'button' | 'group';
  border?: boolean;
};