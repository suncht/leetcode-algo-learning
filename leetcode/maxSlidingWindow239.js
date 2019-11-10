/**
 * 239. 滑动窗口最大值
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

 返回滑动窗口中的最大值。
 * @param head
 * @returns {null|*}
 */

function MaxQueue(maxLength) {
    if(maxLength < 1) maxLength = 1;
    this.data = new Array(maxLength);
    this.numIndexs = new Array(maxLength);
    this.maxLength = maxLength;
    this.realLength = 0;

    for(let i=0; i<this.maxLength; i++) {
        this.data[i] = null;
    }
    for(let i=0; i<this.maxLength; i++) {
        this.numIndexs[i] = null;
    }

    this.enqueue = function ( element, numIndex ) {
        if(this.realLength === 0) {
            this.data[0] = element;
            this.numIndexs[0] = numIndex;
            this.realLength++;
        } else if(this.realLength < this.maxLength) {
            this.data[this.realLength] = element;
            this.numIndexs[this.realLength] = numIndex;
            this.realLength++;
            for(let i=this.realLength-1; i>=1; i--) {
                if(this.data[i] > this.data[i-1]) {
                    this._swap(this.data, i, i - 1);
                    this._swap(this.numIndexs, i, i - 1);
                }
            }
        } else {
            let minIndex = this._getMinIndex();
            this.data[minIndex] = element;
            this.numIndexs[minIndex] = numIndex;
            this._swapForward(minIndex);
            this._swapBackward(minIndex);
        }
        // console.log(this.data)
    };

    this.getMaxData = function() {
        return this.data[0];
    };

    this._getMinIndex = function () {
        let min = Number.MAX_VALUE;
        let index = -1;
        for(let i=0; i<this.realLength; i++) {
            if(this.numIndexs[i] < min) {
                min = this.numIndexs[i];
                index = i;
            }
        }

        return index;
    };



    this._swap = function(arr, a, b) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    };

    this._swapBackward = function (targetIndex) {
        for(let i=targetIndex; i>=1; i--) {
            if(this.data[i] > this.data[i-1]) {
                this._swap(this.data, i, i - 1);
                this._swap(this.numIndexs, i, i - 1);
            } else {
                break;
            }
        }
    };

    this._swapForward = function (targetIndex) {
        for(let i=targetIndex; i<this.realLength-1; i++) {
            if(this.data[i] < this.data[i+1]) {
                this._swap(this.data, i, i + 1);
                this._swap(this.numIndexs, i, i + 1);
            } else {
                break;
            }
        }
    };
}
var maxSlidingWindow239 = function(nums, k) {
    let result = [];
    if(nums.length === 0) {
        return result;
    }

    if(k === 1) {
        return nums;
    }

    let queue = new MaxQueue(k);
    if(nums.length <= k) {
        for (let i = 0; i < nums.length; i++) {
            queue.enqueue(nums[i], i);
        }

        result.push(queue.getMaxData())
    } else {
        for (let i = 0; i < nums.length; i++) {
            queue.enqueue(nums[i], i);

            if(i>=k-1) {
                result.push(queue.getMaxData())
            }
        }
    }

    return result;
};