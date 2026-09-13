import React, { PropsWithChildren } from 'react';
import Container from '../../strum-design-system/components/Container/Container';
import { styleFor } from '../../strum-design-system/utils/compose';
import { sectionStyle } from './Section.css';

interface Section {
  color?: keyof typeof sectionStyle;
}

const Section: React.FC<PropsWithChildren<Section>> = (props) => {
  const { children, color } = props;

  return (
    <section className={styleFor(sectionStyle, color)}>
      <Container>{children}</Container>
    </section>
  );
};

export default Section;
