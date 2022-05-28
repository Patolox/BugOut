package br.unicap.bugout.base;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class StringMapper {

    public String clean(String s) {
        return StringUtils.trimToNull(s);
    }

}
