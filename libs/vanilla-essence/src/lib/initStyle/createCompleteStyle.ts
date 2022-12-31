import { CustomComplexStyle, InitStyleConfig } from '../types';
import { style as vanillaStyle } from '@vanilla-extract/css';
import { createComplexStyleRule } from '../createComplexStyleRule';
import { createMagicValueCSSClasses } from '../utils/createMagicValueCSSClasses';

export const createCompleteStyle = <C extends InitStyleConfig>({
  config,
}: {
  config: C;
}) => {
  type StyleProps = CustomComplexStyle<C>;

  const magicValueMethods = createMagicValueCSSClasses<C['magicProps']>(
    config['magicProps']
  );

  const completeStyle = (givenStyle: StyleProps) =>
    vanillaStyle(
      createComplexStyleRule({
        givenStyle,
        config,
        magicValueMethods,
      })
    );

  return completeStyle;
};
