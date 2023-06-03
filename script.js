// Utility function to delay execution for a given time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Function to generate a random array
  function generateRandomArray() {
    const arraySize = document.getElementById("array-size").value;
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";
  
    for (let i = 0; i < arraySize; i++) {
      const value = Math.floor(Math.random() * 300) + 10;
      const arrayBar = document.createElement("div");
      arrayBar.className = "array-bar";
      arrayBar.style.height = value + "px";
      arrayBar.style.backgroundColor = `hsl(${value / 3}, 80%, 50%)`;
      arrayContainer.appendChild(arrayBar);
    }
  }
  
  // Function to visualize Merge Sort
  async function visualizeMergeSort(arr) {
    async function mergeSort(arr, low, high) {
      if (low < high) {
        const mid = Math.floor((low + high) / 2);
        await mergeSort(arr, low, mid);
        await mergeSort(arr, mid + 1, high);
        await merge(arr, low, mid, high);
      }
    }
  
    async function merge(arr, low, mid, high) {
      const n1 = mid - low + 1;
      const n2 = high - mid;
  
      const left = [];
      const right = [];
  
      for (let i = 0; i < n1; i++) {
        left[i] = arr[low + i];
      }
  
      for (let j = 0; j < n2; j++) {
        right[j] = arr[mid + 1 + j];
      }
  
      let i = 0;
      let j = 0;
      let k = low;
  
      while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }
        k++;
        await sleep(50);
        updateArrayBars(arr);
      }
  
      while (i < n1) {
        arr[k] = left[i];
        i++;
        k++;
        await sleep(50);
        updateArrayBars(arr);
      }
  
      while (j < n2) {
        arr[k] = right[j];
        j++;
        k++;
        await sleep(50);
        updateArrayBars(arr);
      }
    }
  
    const startTime = performance.now();
    await mergeSort(arr, 0, arr.length - 1);
    const endTime = performance.now();
  
    updateArrayBars(arr);
    return endTime - startTime;
  }
  
  // Function to visualize Quick Sort
  async function visualizeQuickSort(arr) {
    async function quickSort(arr, low, high) {
      if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
      }
    }
  
    async function partition(arr, low, high) {
      const pivot = arr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          await sleep(50);
          updateArrayBars(arr);
        }
      }
  
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      await sleep(50);
      updateArrayBars(arr);
      return i + 1;
    }
  
    const startTime = performance.now();
    await quickSort(arr, 0, arr.length - 1);
    const endTime = performance.now();
  
    updateArrayBars(arr);
    return endTime - startTime;
  }
  
  // Function to visualize Insertion Sort
  async function visualizeInsertionSort(arr) {
    const n = arr.length;
    // const startTime = performance.now();
  
    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        await sleep(50);
        updateArrayBars(arr);
      }
  
      arr[j + 1] = key;
      await sleep(50);
      updateArrayBars(arr);
  
      // const endTime = performance.now();
      // return endTime - startTime;
    }
  }
  
  // Function to select the sorting algorithm based on the input array
  function selectSortingAlgorithm(arr) {
    const n = arr.length;
  
    if (n <= 10) {
      return "Insertion Sort";
    } else if (n <= 50) {
      return "Merge Sort";
    } else {
      return "Quick Sort";
    }
  }
  
  // Function to update the array bars visualization
  function updateArrayBars(arr) {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";
  
    for (let i = 0; i < arr.length; i++) {
      const arrayBar = document.createElement("div");
      arrayBar.className = "array-bar";
      arrayBar.style.height = arr[i] + "px";
      arrayBar.style.backgroundColor = `hsl(${arr[i] / 3}, 80%, 50%)`;
      arrayContainer.appendChild(arrayBar);
    }
  }
  
  // Function to visualize the selected sorting algorithm
  async function visualizeSorting() {
    const arrayContainer = document.getElementById("array-container");
    const arrayBars = arrayContainer.getElementsByClassName("array-bar");
    const sortingAlgorithmDisplay = document.getElementById("sorting-algorithm");
    const timeTakenDisplay = document.getElementById("time-taken");
  
    const arr = [];
    for (let i = 0; i < arrayBars.length; i++) {
      arr.push(parseInt(arrayBars[i].style.height));
    }
  
    const algorithm = selectSortingAlgorithm(arr);
    sortingAlgorithmDisplay.innerHTML = `Sorting Algorithm: ${algorithm}`;
  
    let timeTaken;
  
    switch (algorithm) {
      case "Merge Sort":
        timeTaken = await visualizeMergeSort(arr);
        break;
      case "Quick Sort":
        timeTaken = await visualizeQuickSort(arr);
        break;
      case "Insertion Sort":
        timeTaken = await visualizeInsertionSort(arr);
        break;
      default:
        console.log("No suitable sorting algorithm found.");
        break;
    }
  
    const timeTakenText = timeTaken ? `Time Taken: ${timeTaken.toFixed(2)} milliseconds` : "Time Taken: N/A";
    timeTakenDisplay.innerHTML = timeTakenText;
  }