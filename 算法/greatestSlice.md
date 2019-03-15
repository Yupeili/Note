#Greatest Slice
### 解法一 ——分而治之
思路，不仅要考察分开后两边的解，还要考虑两段区间连续时候的解 *O*(nlogn)  
![Greatest Slice](../图/greatestSlice.png)
### 解法二 ———减而知之
思路，通过定理，从尾部向前遍历，如果序列<=0,则将序列减去。
![Greatest Slice2](../图/greatestSlice2.png)