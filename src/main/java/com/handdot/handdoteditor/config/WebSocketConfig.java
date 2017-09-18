package com.handdot.handdoteditor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@EnableWebSocketMessageBroker
@Configuration
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint(new String[] { "/ws" }).withSockJS();
	}

	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.setApplicationDestinationPrefixes(new String[] { "/app" });
		registry.enableSimpleBroker(new String[] { "/topic" });
	}
}
