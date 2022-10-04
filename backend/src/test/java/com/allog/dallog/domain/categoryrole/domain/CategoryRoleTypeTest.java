package com.allog.dallog.domain.categoryrole.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class CategoryRoleTypeTest {

    @DisplayName("역할 유형이 권한을 가지고 있는지 확인한다.")
    @CsvSource(value = {"ADMIN,UPDATE_CATEGORY,true", "NONE,UPDATE_CATEGORY,false"})
    @ParameterizedTest
    void 역할_유형이_권한을_가지고_있는지_확인한다(final CategoryRoleType roleType, final CategoryAuthority authority,
                                 final boolean expected) {
        // given & when
        boolean actual = roleType.ableTo(authority);

        // then
        assertThat(actual).isEqualTo(expected);
    }
}