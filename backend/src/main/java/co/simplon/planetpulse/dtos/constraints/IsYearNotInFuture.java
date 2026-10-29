package co.simplon.planetpulse.dtos.constraints;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import co.simplon.planetpulse.dtos.constraints.validators.IsYearNotInFutureValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = IsYearNotInFutureValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface IsYearNotInFuture {
    String message() default "YEAR_IN_FUTURE";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
