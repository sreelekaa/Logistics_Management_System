package com.example.backend.security;

import com.example.backend.service.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final JwtRequestFilter jwtRequestFilter;
    private final CustomUserDetailsService userDetailsService;

    public WebSecurityConfig(JwtRequestFilter jwtRequestFilter, CustomUserDetailsService userDetailsService) {
        this.jwtRequestFilter = jwtRequestFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF protection if not needed
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/users/**").permitAll() 
                    .requestMatchers("/contact/**","/api/uploads/**").permitAll() // Allow public access to /contact/add
                    .requestMatchers("/inventory/**").permitAll() // Allow public access to /contact/add
                    .requestMatchers("/contact/**").authenticated() // Secure other contact endpoints
                    .requestMatchers("/**").permitAll() // Allow public access to other endpoints
            )
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    
        return http.build();
    }
    

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    //     http
    //         .authorizeHttpRequests(authorizeRequests ->
    //             authorizeRequests
    //                 .requestMatchers("/login/**").permitAll()
    //                 .anyRequest().authenticated()
    //         )
    //         .sessionManagement(sessionManagement ->
    //             sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    //         )
    //         .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    //     return http.build();
    // }

    @Bean
    public PasswordEncoder webSecurityPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailsService;
    }
}
