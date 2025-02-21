package com.openclassrooms.mddapi.lib;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public final class ReadOnlyList<V> implements List<V> {
    private final List<V> unmodifiableList;

    public ReadOnlyList(List<V> unmodifiableList) {
        this.unmodifiableList = Collections.unmodifiableList(unmodifiableList);
    }

    @Override
    public int size() {
        return unmodifiableList.size();
    }

    @Override
    public boolean isEmpty() {
        return unmodifiableList.isEmpty();
    }

    @Override
    public boolean contains(Object o) {
        return unmodifiableList.contains(o);
    }

    @Override
    public Iterator<V> iterator() {
        return unmodifiableList.iterator();
    }

    @Override
    public Object[] toArray() {
        return unmodifiableList.toArray();
    }

    @Override
    public <T> T[] toArray(T[] a) {
        return unmodifiableList.toArray(a);
    }

    @Override
    public boolean add(V v) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public void add(int index, V element) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean remove(Object o) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public V remove(int index) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return new HashSet<>(unmodifiableList).containsAll(c);
    }

    @Override
    public boolean addAll(Collection<? extends V> c) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean addAll(int index, Collection<? extends V> c) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean removeAll(Collection<?> c) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public boolean retainAll(Collection<?> c) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public void clear() throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public V get(int index) {
        return unmodifiableList.get(index);
    }

    @Override
    public V set(int index, V element) throws UnsupportedOperationException {
        throw new UnsupportedOperationException();
    }

    @Override
    public int indexOf(Object o) {
        return unmodifiableList.indexOf(o);
    }

    @Override
    public int lastIndexOf(Object o) {
        return unmodifiableList.lastIndexOf(o);
    }

    @Override
    public ListIterator<V> listIterator() {
        return unmodifiableList.listIterator();
    }

    @Override
    public ListIterator<V> listIterator(int index) {
        return unmodifiableList.listIterator(index);
    }

    @Override
    public List<V> subList(int fromIndex, int toIndex) {
        return unmodifiableList.subList(fromIndex, toIndex);
    }
}
