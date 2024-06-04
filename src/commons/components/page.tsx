import { Wrapper } from './page.styled';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Page = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};
