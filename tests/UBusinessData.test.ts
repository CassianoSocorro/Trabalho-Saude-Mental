import UsuarioBusiness from "../src/business/UsuarioBusiness";
import UsuarioController from "../src/controller/UsuarioController";
import { Usuario } from "../src/types/Usuario";
import UsuarioData from "../src/data/UsuarioData";

jest.mock("../src/data/UsuarioData", () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
    findAllWithFilters: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
}));

describe("Usuario Business <-> Data Integration", () => {
  const MOCK_ID = 5;

  const MOCK_USUARIO: Usuario = {
    id: 5,
    nome: "Beta User",
    email: "betatester@gmail.com",
    senha: "123456789",
    telefone: "(55)5555-5555",
    role: "user",
    data_cadastro: new Date("2024-01-01"),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve chamar FindById na camada Data quando detalhar um usuário", async () => {
    const mockData = UsuarioData as jest.Mocked<typeof UsuarioData>;

    mockData.findById.mockResolvedValue(MOCK_USUARIO);

    const result = await UsuarioBusiness.detalhar(MOCK_ID);

    expect(mockData.findById).toHaveBeenCalledWith(MOCK_ID);
    expect(result).toEqual(MOCK_USUARIO);
  });

  test("Deve retornar undefined quando não encontrado", async () => {
    const mockData = UsuarioData as jest.Mocked<typeof UsuarioData>;

    mockData.findById.mockResolvedValue(undefined);

    const result = await UsuarioBusiness.detalhar(MOCK_ID);

    expect(result).toBeUndefined();
    expect(mockData.findById).toHaveBeenCalledTimes(1);
  });

  test("cadastrar → cria um novo usuário quando email não existe", async () => {
    const mockData = UsuarioData as jest.Mocked<typeof UsuarioData>;

    mockData.findByEmail.mockResolvedValue(undefined);
    mockData.create.mockResolvedValue(MOCK_USUARIO);

    const result = await UsuarioBusiness.cadastrar({
      nome: "Test User",
      email: "test@example.com",
      senha: "123",
      telefone: "999",
      role: "user",
    });

    expect(mockData.findByEmail).toHaveBeenCalledWith("test@example.com");
    expect(result).toEqual(MOCK_USUARIO);
  });

  test("cadastrar → deve retornar erro quando email já existe", async () => {
    const mockData = UsuarioData as jest.Mocked<typeof UsuarioData>;

    mockData.findByEmail.mockResolvedValue(MOCK_USUARIO);

    const result = await UsuarioBusiness.cadastrar({
      nome: "Test User",
      email: "test@example.com",
      senha: "123",
      telefone: "999",
      role: "user",
    });

    expect(result).toEqual({ error: "E-mail já cadastrado." });
  });

});
