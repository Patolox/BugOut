package br.unicap.bugout.base;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.MappingTarget;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/**
 * Base mapper for DTO update.
 *
 * @param <E> the entity
 * @param <D> the DTO
 */
public interface BaseUpdateMapper<E, D> {

    /**
     * Updates entity through DTO.
     *
     * @param dto    the DTO
     * @param entity the entity
     */
    E updateEntity(D dto, @MappingTarget E entity);

    /**
     * Updates DTO through entity.
     *
     * @param entity the entity
     * @param dto    the DTO
     */
    @InheritInverseConfiguration(name = "updateEntity")
    D updateDTO(E entity, @MappingTarget D dto);

    /**
     * Updates entities through DTOs.
     *
     * @param dtos     the DTOs
     * @param entities the entities
     */
    default Set<E> updateEntities(Collection<D> dtos, @MappingTarget Collection<E> entities) {
        if (dtos == null || dtos.isEmpty() || entities == null)
            return Set.of();

        Iterator<D> dtosIterator = dtos.iterator();
        Iterator<E> entitiesIterator = entities.iterator();

        Set<E> updated = new HashSet<>();
        while (dtosIterator.hasNext() && entitiesIterator.hasNext())
            updated.add(updateEntity(dtosIterator.next(), entitiesIterator.next()));

        return updated;
    }

    /**
     * Updates DTOs through entities
     *
     * @param entities the entities
     * @param dtos     the DTOs
     */
    default Set<D> updateDTOs(Collection<E> entities, @MappingTarget Collection<D> dtos) {
        if (entities == null || entities.isEmpty() || dtos == null)
            return Set.of();

        Iterator<E> entitiesIterator = entities.iterator();
        Iterator<D> dtosIterator = dtos.iterator();

        Set<D> updated = new HashSet<>();
        while (entitiesIterator.hasNext() && dtosIterator.hasNext())
            updated.add(updateDTO(entitiesIterator.next(), dtosIterator.next()));

        return updated;
    }

}
