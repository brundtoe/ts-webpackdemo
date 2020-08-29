class docClass {
    public render(divId: string, text: string){
        const el: HTMLElement | null = document.getElementById(divId)
        if (el) {
            el.innerHTML = text
        }
    }
}
export default new docClass()
