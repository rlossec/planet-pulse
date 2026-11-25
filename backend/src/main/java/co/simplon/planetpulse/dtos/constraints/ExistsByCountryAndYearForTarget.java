package co.simplon.planetpulse.dtos.constraints;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import co.simplon.planetpulse.dtos.constraints.validators.ExistsByCountryAndYearForTargetValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Documented
@Constraint(validatedBy = ExistsByCountryAndYearForTargetValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ExistsByCountryAndYearForTarget {
    String message() default "TARGET_ALREADY_EXISTS";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
