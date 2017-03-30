package org.sprouts.digitalmusic.frontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableDiscoveryClient
@EnableZuulProxy
public class FrontEndServer {

    public static void main(String[] args) {
        System.setProperty("spring.config.name", "frontend-server");
        SpringApplication.run(FrontEndServer.class, args);
    }
}