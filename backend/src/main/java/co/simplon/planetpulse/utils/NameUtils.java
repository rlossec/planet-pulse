package co.simplon.planetpulse.utils;

import java.util.Locale;

public final class NameUtils {

    private NameUtils() {
    }

    public static String normalize(String name) {
        if (name == null) {
            return null;
        }
        return name.trim().toLowerCase();
    }
}
