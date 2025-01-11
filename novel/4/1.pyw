import tkinter as tk
from tkinter import messagebox

def save_to_file():
    title = title_entry.get()
    content = content_entry.get("1.0", tk.END).strip()

    if not title or not content:
        messagebox.showwarning("警告", "標題或內容不可為空！")
        return

    try:
        with open("./novel.txt", "a", encoding="utf-8") as file:
            file.write("\n&&&\n\n")
            file.write(f"//{title}//\n")
            file.write(f"{content}\n")
        messagebox.showinfo("成功", "內容已儲存！")
        title_entry.delete(0, tk.END)
        content_entry.delete("1.0", tk.END)
    except Exception as e:
        messagebox.showerror("錯誤", f"無法儲存：{e}")

# 建立主視窗
root = tk.Tk()
root.title("簡易儲存工具")

# 標題標籤與輸入框
tk.Label(root, text="標題：").pack(pady=(10, 0))
title_entry = tk.Entry(root, width=50)
title_entry.pack(pady=(0, 10))

# 內容標籤與輸入框
tk.Label(root, text="內容：").pack()
content_entry = tk.Text(root, width=50, height=15)
content_entry.pack(pady=(0, 10))

# 儲存按鈕
save_button = tk.Button(root, text="儲存", command=save_to_file)
save_button.pack(pady=(0, 10))

root.mainloop()