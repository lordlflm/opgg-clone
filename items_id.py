with open("items_id.txt", "r") as f:
    l = f.readline()
    while l:
        for _ in range(3):
            start = l.index('"')
            l = l[start + 1 :]
        end = l.index('"')
        l = l[: end - 4]
        try:
            i = l.index("_")
            id = l[:i]
        except:
            id = l
        print(f'case {id}:\n    return "{l}";')
        l = f.readline()
