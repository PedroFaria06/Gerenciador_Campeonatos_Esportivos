package com.soccer.championship.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
<<<<<<< HEAD
      .allowedOrigins("http://localhost")
=======
      .allowedOrigins("http://localhost:4200")
>>>>>>> b9ec6f76c096b3f0e0070124735fe998be0bfd9b
      .allowedMethods("*");
  }

}
