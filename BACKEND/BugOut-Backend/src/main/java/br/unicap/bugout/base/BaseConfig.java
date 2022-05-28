package br.unicap.bugout.base;

import org.mapstruct.*;

/**
 * Base used to share mapper configurations.
 *
 * <p>Configurations:
 *
 * <ul>
 *   <li>Null value properties are ignored
 *   <li>Trim strings and uppercases strings
 * </ul>
 *
 * @see MapperConfig
 */
@MapperConfig(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
        builder = @Builder(disableBuilder = true),
        uses = {StringMapper.class, NumberMapper.class}
)
public interface BaseConfig {
}
