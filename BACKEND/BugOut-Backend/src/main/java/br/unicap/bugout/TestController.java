package br.unicap.bugout;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${spring.data.rest.base-path}/test")
public class TestController {

    @GetMapping
    public String get() {
        return "Hello World!";
    }

}
