# Adaptive-Sorting-Algorithm-Visualizer

// some changes are to be done in code (refining it)

## Quick Sort -
![Quick Sort](images/quick_sort.png)

------------------

## Merge Sort -
![Merge Sort](images/merge_sort.png)

------------------

## Merge Sort in process -
![Merge Sort in Process](images/merge_sort_in_process.png)

------------------

## Insertion Sort
![Insertion Sort](images/insertion_sort.png)

------------------

Futures can be created either _implicitly_ or _explicitly_.  In the introductory example above we used _implicit futures_ created via the `v %<-% { expr }` construct.  An alternative is _explicit futures_ using the `f <- future({ expr })` and `v <- value(f)` constructs.  With these, our example could alternatively be written as:

```
> library(future)
> f <- future({
+   cat("Hello world!\n")
+   3.14
+ })
> v <- value(f)
Hello world!
> v
[1] 3.14
```
