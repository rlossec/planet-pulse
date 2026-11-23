package co.simplon.planetpulse.dtos.constraints;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import co.simplon.planetpulse.dtos.constraints.validators.AtLeastOneIndicatorProvidedValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = AtLeastOneIndicatorProvidedValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface AtLeastOneIndicatorProvided {
    String message() default "INDICATOR_REQUIRED";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}