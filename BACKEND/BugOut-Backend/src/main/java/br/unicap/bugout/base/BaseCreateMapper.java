package br.unicap.bugout.base;

import org.mapstruct.InheritInverseConfiguration;

import java.util.Collection;
import java.util.List;

/**
 * Base mapper for DTO creation.
 *
 * @param <E> the entity
 * @param <D> the DTO
 */
public interface BaseCreateMapper<E, D> {

    /**
     * Converts DTO to entity.
     *
     * @param dto the DTO
     * @return the entity
     */
    E toEntity(D dto);

    /**
     * Converts entity to DTO.
     *
     * @param entity the entity
     * @return the DTO
     */
    @InheritInverseConfiguration(name = "toEntity")
    D toDTO(E entity);

    /**
     * Convert all entities to DTOs.
     *
     * @param dtos the dtos
     * @return the entities
     */
    List<E> toEntities(Collection<D> dtos);

    /**
     * Convert all entities to DTOs.
     *
     * @param entities the entities
     * @return the DTOs
     */
    List<D> toDTOs(Collection<E> entities);

}
