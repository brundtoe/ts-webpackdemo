class docClass {
    public render(divId: string, text: string){
        const el: HTMLElement | null = document.getElementById(divId)
        if (el) {
            el.innerHTML = text
        }
    }
}
const docElement = new docClass()
export default docElement
