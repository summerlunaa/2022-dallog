package com.allog.dallog.domain.auth.application;

import com.allog.dallog.domain.auth.dto.OAuthMember;
import com.allog.dallog.domain.auth.dto.TokenResponse;
import com.allog.dallog.domain.composition.application.RegisterService;
import com.allog.dallog.domain.member.application.MemberService;
import com.allog.dallog.domain.member.domain.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Service
public class AuthService {

    private final OAuthUri oAuthUri;
    private final OAuthClient oAuthClient;
    private final MemberService memberService;
    private final RegisterService registerService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(final OAuthUri oAuthUri, final OAuthClient oAuthClient, final MemberService memberService,
                       final RegisterService registerService, final JwtTokenProvider jwtTokenProvider) {
        this.oAuthUri = oAuthUri;
        this.oAuthClient = oAuthClient;
        this.memberService = memberService;
        this.registerService = registerService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public String generateGoogleLink() {
        return oAuthUri.generate();
    }

    @Transactional
    public TokenResponse generateTokenWithCode(final String code) {
        OAuthMember oAuthMember = oAuthClient.getOAuthMember(code);
        String email = oAuthMember.getEmail();

        saveMemberIfNotExists(oAuthMember, email);

        Member foundMember = memberService.getByEmail(email);
        String accessToken = jwtTokenProvider.createToken(String.valueOf(foundMember.getId()));

        return new TokenResponse(accessToken);
    }

    private void saveMemberIfNotExists(final OAuthMember oAuthMember, final String email) {
        if (!memberService.existsByEmail(email)) {
            registerService.register(oAuthMember);
        }
    }

    public Long extractMemberId(final String accessToken) {
        jwtTokenProvider.validateToken(accessToken);
        String payload = jwtTokenProvider.getPayload(accessToken);
        Long memberId = Long.valueOf(payload);
        memberService.validateExistsMember(memberId);
        return memberId;
    }
}
