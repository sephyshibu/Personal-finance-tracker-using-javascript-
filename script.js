let total=0;
let transactions=[];

const storedtrans=localStorage.getItem('transactions');
if(storedtrans){
    transactions = JSON.parse(storedtrans);
    for(const trans of transactions)
    {
        // total+=trans.amount;
        addTransaction(trans.category,trans.amount,false,false);
    }
    
    document.getElementById('totalamount').textContent = `Rs ${total.toFixed(2)}`;
}



document.getElementById('category').addEventListener('change', function() {
    const descriptionInput = document.getElementById('others');
    if (this.value === 'Others') {
        descriptionInput.style.display = 'block';
        descriptionInput.required = true; // Ensure it's required only when shown
    } else {
        descriptionInput.style.display = 'none';
        descriptionInput.required = false; // Not required when hidden
    }
});



document.getElementById('transactionform').addEventListener('submit',function(e){
    e.preventDefault();

    const description=document.getElementById('others').value;
    let category=document.getElementById('category').value;
    const amount=parseFloat(document.getElementById('amount').value);

    // if(category==="Others")
    // {
    //     category=description;
    // }

    const transaction={
        category,
        amount,
        date : new Date().toLocaleDateString()
    };
    transactions.push(transaction);
    addTransaction(category,amount,true,true);

    document.getElementById('amount').value = '';
    document.getElementById('others').value = '';
    localStorage.setItem('transactions', JSON.stringify(transactions));
});

function addTransaction(category,amount,updatetotal=true,addToTable = true){
    if(addToTable){
    
    const transactionlist=document.getElementById('transaction-list');
    const row = document.createElement('tr');


    const categorycell=document.createElement('td');
    categorycell.textContent=category;
    row.append(categorycell);

    const amountcell=document.createElement('td');
    amountcell.textContent=`Rs ${amount.toFixed(2)}`;
    row.append(amountcell);

    // const actioncell=document.createElement('td');
    const deletebutton = document.createElement('button');
    deletebutton.classList.add('deletebtn');
    deletebutton.innerHTML = '&#10006;'; 
    deletebutton.addEventListener('click', function(){
        transactionlist.removeChild(row);
        total-=amount;
        document.getElementById('totalamount').textContent=`Rs ${total.toFixed(2)}`;
        // transactions = transactions.filter(trans => !(trans.category === category && trans.amount === amount));
        // localStorage.setItem('transactions', JSON.stringify(transactions));
        const filteredTransactions = transactions.filter(
            (trans) => !(trans.category === category && trans.amount === amount)
          );
          transactions = filteredTransactions;
          localStorage.setItem('transactions', JSON.stringify(transactions));
    
          // Update history table (call viewfunction)
          viewfunction();
    });

    row.append(deletebutton);
    transactionlist.appendChild(row);
}
    if(updatetotal){
        total+=amount;
        document.getElementById('totalamount').textContent=`Rs ${total.toFixed(2)}`;
    }

    
    

    document.getElementById('amount').value = '';
    document.getElementById('others').value = '';
    // document.getElementById('description').value = '';

}
    const viewHistoryButton = document.getElementById('view-history');
    const historyContainer = document.getElementById('history-container');
    const closeHistoryButton = document.getElementById('close-history');
    const filterCategorySelect = document.getElementById('filter-category');

    viewHistoryButton.addEventListener('click', function(){
        historyContainer.style.display='block';
        viewfunction();
    });

    closeHistoryButton.addEventListener('click', function() {
        historyContainer.style.display = 'none';
      });

    filterCategorySelect.addEventListener('change', function(){
        viewfunction();
    });

    function viewfunction(){
        const historybody=document.getElementById("historybody");
        historybody.innerHTML="";
    
        let historytotal=0;

        const filtercategory=filterCategorySelect.value;
        const filtertransaction=filtercategory==='All'? transactions:transactions.filter(trans1=>trans1.category===filtercategory);
        for(const trans of filtertransaction)
        {
            const row=document.createElement('tr');

            const categorycell=document.createElement('td');
            categorycell.textContent=trans.category;
            row.append(categorycell);

            const amountcell=document.createElement('td');
            amountcell.textContent=trans.amount;
            row.append(amountcell);

            const datecell=document.createElement('td');
            datecell.textContent=trans.date;
            row.append(datecell);
            
            historytotal+=trans.amount;
            historybody.append(row);
        }
        const totalRow = document.createElement('tr');
        const totalCell = document.createElement('td');
        // totalCell.textContent = 'Total';
        totalRow.append(totalCell);

        const historyTotalCell = document.createElement('td');
        const his= document.getElementById('totalamount1');
        his.textContent = `Rs ${historytotal.toFixed(2)}`;
        totalRow.append(historyTotalCell);

        const emptyCell = document.createElement('td'); // Empty cell for alignment
        totalRow.append(emptyCell);

        historybody.appendChild(totalRow);
    }

    // document.getElementById('category').value = '';
    