package co.simplon.planetpulse.dtos.constraints;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import co.simplon.planetpulse.dtos.constraints.validators.IsYearAfterCurrentValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = IsYearAfterCurrentValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface IsYearAfterCurrent {
    String message() default "TARGET_YEAR_MINIMUM";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
