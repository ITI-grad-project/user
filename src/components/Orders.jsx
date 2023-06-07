export default function Orders() {
  return (
    <div className="p-6">
      <h4 className="font-bold text-lg text-primary mb-3">My Orders</h4>
      <div className="overflow-x-auto hidden md:block">
        <table className="table w-full">
          {/* head */}
          <thead className="">
            <tr>
              <th></th>
              <th className="capitalize text-sm">Product</th>
              <th className="capitalize text-sm">Price</th>
              <th className="capitalize text-sm">Status</th>
              <th className="capitalize text-sm">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* row 1 */}
            <tr className="">
              <th className="w-24">
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
                  </div>
                </div>
              </th>
              <td className="whitespace-nowrap">Silver Leather High Heels</td>
              <td>EGP 300</td>
              <td>
                <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-yellow-800 bg-yellow-200 bg-opacity-70 rounded-2xl">
                  Pending
                </span>
              </td>
              <td>22 May, 2023</td>
            </tr>
            <tr className="">
              <th className="w-24">
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
                  </div>
                </div>
              </th>
              <td>Silver Leather High Heels</td>
              <td>EGP 300</td>
              <td>
                <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-green-800 bg-green-200 bg-opacity-70 rounded-2xl">
                  Delivered
                </span>
              </td>
              <td>22 May, 2023</td>
            </tr>
            <tr className="">
              <th className="w-24">
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
                  </div>
                </div>
              </th>
              <td>Silver Leather High Heels</td>
              <td>EGP 300</td>
              <td>
                <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-blue-800 bg-blue-200 bg-opacity-70 rounded-2xl">
                  Shipped
                </span>
              </td>
              <td>22 May, 2023</td>
            </tr>
            <tr className="">
              <th className="w-24">
                <div className="avatar">
                  <div className="w-24 rounded-xl">
                    <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
                  </div>
                </div>
              </th>
              <td>Silver Leather High Heels</td>
              <td>EGP 300</td>
              <td>
                <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-red-800 bg-red-200 bg-opacity-70 rounded-2xl">
                  Canceled
                </span>
              </td>
              <td>22 May, 2023</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ----------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <div className="space-y-3 rounded-lg divide-y divide-gray-200">
          <div className="flex gap-5 pt-2">
            <div className="avatar">
              <div className="w-24 aspect-square rounded-xl">
                <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">Silver Leather High Heels</h3>
              <p className="pt-2">EGP 300</p>
              <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-yellow-800 bg-yellow-200 bg-opacity-70 rounded-2xl">
                  Pending
              </span>
              <p>23 May, 2023</p>
            </div>
          </div>
          <div className="flex gap-5 pt-2">
            <div className="avatar">
              <div className="w-24 aspect-square rounded-xl">
                <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold">Silver Leather High Heels </h3>
              <p className="pt-2">EGP 300</p>
              <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-yellow-800 bg-yellow-200 bg-opacity-70 rounded-2xl">
                  Pending
              </span>
              <p>23 May, 2023</p>
            </div>
          </div>
        </div>
      </div>


{/* <div className="overflow-x-auto">
  <table className="table w-full">
    <tbody className="divide-y divide-gray-200">
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-24 h-24 mask mask-square rounded-xl">
                <img src="https://images.unsplash.com/photo-1534653299134-96a171b61581?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=975&q=80" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">Silver Leather High Heels</div>
              <div>EGP 300</div>
              <span className="py-1.5 px-6 w-28 text-center text-sm font-semibold text-yellow-800 bg-yellow-200 bg-opacity-70 rounded-2xl">
                  Pending
                </span>
                <p>23 May, 2023</p>
            </div>
          </div>
        </td>
      </tr>
     
    </tbody>
  </table>
</div> */}
    </div>
  );
}
