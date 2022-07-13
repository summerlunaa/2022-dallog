package com.allog.dallog.infrastructure.oauth.client;

import com.allog.dallog.infrastructure.oauth.dto.OAuthMember;

public class StubOAuthClient implements OAuthClient {

    @Override
    public OAuthMember getOAuthMember(final String code) {
        return new OAuthMember("dev.hyeonic@gmail.com", "Fake Name", "Fake Profile Image Url");
    }
}
