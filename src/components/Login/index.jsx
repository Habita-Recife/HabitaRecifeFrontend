        <div className="flex flex-col items-center gap-4">
          <ButtonComponent text="Entrar" type="submit" />
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Esqueceu a senha?
            </button>
            <button
              type="button"
              onClick={() => setIsCadastroModalOpen(true)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Faça seu cadastro
            </button>
          </div>
        </div> 