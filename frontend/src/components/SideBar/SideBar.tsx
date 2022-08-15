import { useTheme } from '@emotion/react';
import { lazy, Suspense } from 'react';
import { useRecoilValue } from 'recoil';

import { sideBarState, userState } from '@/recoil/atoms';

import FilterCategoryFallback from '@/components/FilterCategoryList/FilterCategoryList.fallback';

import { sideBar } from './SideBar.styles';

const FilterCategoryList = lazy(() => import('@/components/FilterCategoryList/FilterCategoryList'));

function SideBar() {
  const { accessToken } = useRecoilValue(userState);
  const isSideBarOpen = useRecoilValue(sideBarState);

  const theme = useTheme();

  if (!accessToken) {
    return <></>;
  }

  return (
    <div css={sideBar(theme, isSideBarOpen)}>
      <Suspense fallback={<FilterCategoryFallback />}>
        <FilterCategoryList />
      </Suspense>
    </div>
  );
}

export default SideBar;
