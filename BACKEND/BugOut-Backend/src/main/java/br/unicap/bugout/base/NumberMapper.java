package br.unicap.bugout.base;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class NumberMapper {

    public BigDecimal round(BigDecimal value) {
        if (value == null)
            return null;

        return value.setScale(2, RoundingMode.HALF_UP);
    }

    public Double round(Double value) {
        if (value == null)
            return null;

        return BigDecimal.valueOf(value).setScale(2, RoundingMode.HALF_UP).doubleValue();
    }

}
