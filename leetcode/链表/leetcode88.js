var merge = function(nums1, m, nums2, n) {
    let len = m + n - 1
    if (m === 0) {
        nums1.splice(0,nums2.length,...nums2)
        return
    }
    while (m > 0 && n > 0) {
        if (nums1[m - 1] > nums2[n - 1]) {
            nums1[len--] = nums1[m - 1]
            m--
        } else {
            nums1[len--] = nums2[n - 1]
            n--
        }
    }
    while (n > 0) {
        nums1[len--] = nums[n - 1]
        n--
    }
}

nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
merge(nums1, m, nums2, n)
console.log(nums1)