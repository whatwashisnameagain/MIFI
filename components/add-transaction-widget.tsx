"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Transaction } from "@/types"
import DatePicker from "@/components/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface AddTransactionProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const AddTransactionWidget: React.FC<AddTransactionProps> = ({ setTransactions, transactions }) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tabValue, setTabValue] = useState<string>("debit")
  const [amount, setAmount] = useState<number>(0)
  const [description, setDescription] = useState<string>("-")

  const addTransaction = () => {
    if (!amount) return alert("Please enter an amount greater than zero")

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      amount: amount,
      description: description,
      type: tabValue,
      date: date
    }

    const newTransactionLedger = [...transactions, newTransaction]
    setTransactions(newTransactionLedger)

    setDescription("");
    setAmount(0);
  }

  return (
    <Card className="h-5/6 w-1/2 flex flex-col justify-center items-center">
      <CardHeader className="items-center">
        <CardTitle>Add Transaction</CardTitle>
        <CardDescription>Add a transaction to your ledger</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <DatePicker date={date} setDate={setDate}/>
        <Tabs value={tabValue} onValueChange={v => setTabValue(v)} className="flex flex-col items-center w-[400px] m-5">
          <TabsList>
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="debit">Debit</TabsTrigger>
          </TabsList>
          <TabsContent value="credit">This amount will be credited to your account</TabsContent>
          <TabsContent value="debit">This amount will be debited from your account</TabsContent>
        </Tabs>
        <div className="flex justify-center items-center mb-2">
          <div className="flex text-slate-500 justify-center items-center">
            <p className="p-1 flex">
              <b>$</b>
            </p>
          </div>
          <Input 
            className="w-full" 
            placeholder="amount" 
            value={amount} 
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>
        <Textarea 
          className="w-full" 
          placeholder="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </CardContent>
      <CardFooter className="w-full justify-center">
        <Button
          onClick={addTransaction}
          variant="outline" 
          className="w-1/2">Add</Button>
      </CardFooter>
    </Card>
  );
}

export default AddTransactionWidget