export interface Pessoa {
    id: string;
    username: string,
    email: string,
    birthdate: string,
    address: string,
    gender: string,
    profession: string,
    company: string,
    whatsappNumber: string,
    phoneNumber: string,
    photoUrl: string,
    createdAt: string
}
export interface Empresa {
    id:string;
    razaoSocial: string
    nomeFantasia: string
    email: string
    cnpj: string
    responsavel: string
    whatsappNumber: string
    celular: string
    telefoneFixo: string
    endereco: string
    logoUrl: string
}