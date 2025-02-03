package com.soccer.championship;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.soccer.championship") 
public class SoccerChampionshipManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SoccerChampionshipManagerApplication.class, args);
    }
}
