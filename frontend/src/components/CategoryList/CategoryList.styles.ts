import { css, Theme } from '@emotion/react';

const categoryTable = css`
  overflow-y: overlay;

  width: 100%;
  height: 100%;
`;

const categoryTableHeader = ({ flex, colors }: Theme) => css`
  ${flex.row}

  justify-content: space-around;

  width: 100%;
  height: 12rem;
  border-bottom: 2px solid ${colors.GRAY_400};

  background: ${colors.GRAY_100};

  font-size: 4rem;
  font-weight: 700;
`;

const intersectTarget = css`
  height: 1rem;
`;

const item = css`
  flex: 1 1 0;
  text-align: center;
`;

export { categoryTable, categoryTableHeader, intersectTarget, item };
