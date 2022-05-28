package br.unicap.bugout.base;

/**
 * Base mapper for DTO conversion.
 *
 * @param <E> the entity
 * @param <D> the DTO
 */
public interface BaseMapper<E, D> extends BaseCreateMapper<E, D>, BaseUpdateMapper<E, D> {

}
