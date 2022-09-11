import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import useToggle from '@/hooks/useToggle';

import { SubscriptionType } from '@/@types/subscription';

import { sideBarState } from '@/recoil/atoms';

import Button from '@/components/@common/Button/Button';
import ModalPortal from '@/components/@common/ModalPortal/ModalPortal';
import FilterCategoryItem from '@/components/FilterCategoryItem/FilterCategoryItem';
import GoogleImportModal from '@/components/GoogleImportModal/GoogleImportModal';

import { AiOutlineDown, AiOutlineGooglePlus, AiOutlineUp } from 'react-icons/ai';

import { contentStyle, headerLayoutStyle, headerStyle, listStyle } from './SideGoogleList.styles';

interface SideGoogleListProps {
  categories: SubscriptionType[];
}

function SideGoogleList({ categories }: SideGoogleListProps) {
  const isSideBarOpen = useRecoilValue(sideBarState);

  const theme = useTheme();

  const { state: isGoogleListOpen, toggleState: toggleGoogleListOpen } = useToggle(true);
  const { state: isGoogleImportModalOpen, toggleState: toggleGoogleImportModalOpen } = useToggle();

  const handleClickGoogleImportButton = () => {
    toggleGoogleImportModalOpen();
  };

  return (
    <div css={listStyle(theme, isSideBarOpen)}>
      <div css={headerLayoutStyle}>
        <span css={headerStyle} onClick={toggleGoogleListOpen}>
          구글 카테고리 목록
        </span>
        <Button>
          <AiOutlineGooglePlus size={20} onClick={handleClickGoogleImportButton} />
        </Button>
        <Button onClick={toggleGoogleListOpen}>
          {isGoogleListOpen ? <AiOutlineUp /> : <AiOutlineDown />}
        </Button>
      </div>
      <div css={contentStyle(isGoogleListOpen, categories.length)}>
        {categories.map((el) => {
          return <FilterCategoryItem key={el.category.id} subscription={el} />;
        })}
      </div>
      <ModalPortal isOpen={isGoogleImportModalOpen} closeModal={toggleGoogleImportModalOpen}>
        <GoogleImportModal closeModal={toggleGoogleImportModalOpen} />
      </ModalPortal>
    </div>
  );
}

export default SideGoogleList;
